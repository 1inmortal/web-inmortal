import * as THREE from 'three';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        const Flip = window.Flip;
        const Observer = window.Observer;
        gsap.registerPlugin(ScrollTrigger, Flip, Observer);
        if (typeof window.TextPlugin !== 'undefined') gsap.registerPlugin(window.TextPlugin);

        const $ = (s) => document.querySelector(s);
        const $$ = (s) => document.querySelectorAll(s);

        // Detectar base path desde la ubicación del script en el DOM
        const getBasePath = () => {
            // Método 1: Buscar el script actual en el DOM
            try {
                const scripts = document.querySelectorAll('script[type="module"]');
                for (const script of scripts) {
                    if (script.src && script.src.includes('vault-app.js')) {
                        const scriptUrl = new URL(script.src, window.location.href);
                        const scriptPath = scriptUrl.pathname;
                        const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
                        console.log('Base path desde script DOM:', basePath);
                        return basePath;
                    }
                }
            } catch (e) {
                console.warn('Error buscando script en DOM:', e);
            }
            
            // Método 2: Usar import.meta.url si está disponible
            try {
                const scriptUrl = new URL(import.meta.url);
                const scriptPath = scriptUrl.pathname;
                const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
                console.log('Base path desde import.meta.url:', basePath);
                return basePath;
            } catch (e) {
                console.warn('No se pudo usar import.meta.url:', e);
            }
            
            // Método 3: Fallback a window.location.pathname
            const pathname = window.location.pathname;
            console.log('Pathname completo:', pathname);
            const lastSlash = pathname.lastIndexOf('/');
            if (lastSlash > 0) {
                const basePath = pathname.substring(0, lastSlash + 1);
                console.log('Base path desde pathname:', basePath);
                return basePath;
            }
            
            console.warn('No se pudo extraer base path, usando raíz');
            return '/';
        };
        const basePath = getBasePath();
        const GLB_PATH = basePath + 'asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb';
        console.log('Base path detectado:', basePath);
        console.log('GLB_PATH final:', GLB_PATH);
        const D2R = Math.PI / 180;

        // --- Three.js: rig data for GSAP (degrees / percent) ---
        const rigData = {
            rotationX: 20, rotationY: 0, rotationZ: 0,
            scale: 1, xPercent: 0, positionY: 200,
            opacity: 0
        };
        const lidData = { rotationX: -90 };

        // --- Camera data (position + lookAt) for cinematic planos ---
        const cameraData = {
            x: 0, y: 0, z: 800,
            lookAtX: 0, lookAtY: 0, lookAtZ: 0
        };

        // --- Hotspots por escena: localPos, tIn/tOut, priority, offset (px), side/align ---
        const HOTSPOTS_BY_SCENE = {
            'scene-ports': [
                { id: 'io-1', label: 'HDMI 2.1 · USB-C', localPos: { x: -200, y: -90, z: 50 }, align: 'left', side: 'right', tIn: 0.1, tOut: 0.6, priority: 1, offset: 56 },
                { id: 'io-2', label: '3.5mm · LAN', localPos: { x: -210, y: -110, z: -20 }, align: 'left', side: 'right', tIn: 0.2, tOut: 0.65, priority: 2, offset: 56 }
            ],
            'scene-display-detail': [
                { id: 'panel-1', label: '17.3" WQHD 240Hz', localPos: { x: 0, y: 70, z: 190 }, align: 'center', side: 'bottom', tIn: 0.15, tOut: 0.7, priority: 1, offset: 56 }
            ],
            'scene-undercarriage': [
                { id: 'vent-1', label: 'Intake', localPos: { x: -120, y: -170, z: 0 }, align: 'left', side: 'top', tIn: 0.1, tOut: 0.5, priority: 1, offset: 56 },
                { id: 'vent-2', label: 'Arc Flow Fans', localPos: { x: 0, y: -175, z: 0 }, align: 'center', side: 'top', tIn: 0.2, tOut: 0.6, priority: 2, offset: 56 },
                { id: 'vent-3', label: 'Exhaust', localPos: { x: 120, y: -170, z: 0 }, align: 'right', side: 'top', tIn: 0.15, tOut: 0.55, priority: 1, offset: 56 }
            ]
        };

        // Mapeo keyword -> { sceneId, hotspotId } para auto-anclas por nombre de mesh
        const HOTSPOT_MESH_KEYWORDS = [
            { sceneId: 'scene-ports', hotspotId: 'io-1', keywords: ['hdmi', 'usb', 'typec', 'usbc'] },
            { sceneId: 'scene-ports', hotspotId: 'io-2', keywords: ['lan', 'rj45', 'audio', 'jack', '3.5'] },
            { sceneId: 'scene-display-detail', hotspotId: 'panel-1', keywords: ['screen', 'display', 'bezel', 'panel'] },
            { sceneId: 'scene-undercarriage', hotspotId: 'vent-1', keywords: ['intake', 'vent', 'grill', 'grille'] },
            { sceneId: 'scene-undercarriage', hotspotId: 'vent-2', keywords: ['fan', 'vent', 'grill'] },
            { sceneId: 'scene-undercarriage', hotspotId: 'vent-3', keywords: ['exhaust', 'vent', 'grill'] }
        ];
        const MESH_ANCHOR_KEYWORDS = ['hdmi', 'usb', 'typec', 'lan', 'rj45', 'audio', 'jack', 'vent', 'grill', 'intake', 'exhaust', 'screen', 'display', 'bezel', 'hinge'];

        let scene, camera, renderer, laptopGroup, lidMesh, canvas, glbModel = null;
        let activeHotspotsScene = null;
        const hotspotDoms = {};
        const _vec3 = new THREE.Vector3();
        const _ndc = new THREE.Vector3();
        const _worldCenter = new THREE.Vector3();
        const _localPoint = new THREE.Vector3();
        let hotspotFrameCounter = 0;
        let calibrationMode = false;
        let calibrationTarget = null; // { sceneId, index }
        const calibrationTargets = []; // flat list { sceneId, index, id } for keys 1-6
        let raycaster, mouseNDC;
        const hotspotStats = {}; // key = sceneId+'-'+id -> { framesVisible, framesBad }
        const HOTSPOT_OFFSET_PX = 56;
        const EDGE_NDC = 0.95;
        const LOG_STATS_INTERVAL_MS = 8000;

        function tryAutoAnchors(model) {
            const box = new THREE.Box3();
            const worldCenter = new THREE.Vector3();
            const localPoint = new THREE.Vector3();
            const assigned = new Set();
            model.updateMatrixWorld(true);
            model.traverse((child) => {
                if (!child.isMesh) return;
                const n = (child.name || '').toLowerCase();
                for (const { sceneId, hotspotId, keywords } of HOTSPOT_MESH_KEYWORDS) {
                    const key = sceneId + '-' + hotspotId;
                    if (assigned.has(key)) continue;
                    if (!keywords.some(kw => n.includes(kw))) continue;
                    const sceneList = HOTSPOTS_BY_SCENE[sceneId];
                    if (!sceneList) continue;
                    const def = sceneList.find(d => d.id === hotspotId);
                    if (!def) continue;
                    box.setFromObject(child);
                    box.getCenter(worldCenter);
                    localPoint.copy(worldCenter);
                    laptopGroup.worldToLocal(localPoint);
                    def.localPos.x = localPoint.x;
                    def.localPos.y = localPoint.y;
                    def.localPos.z = localPoint.z;
                    assigned.add(key);
                    console.log('[Hotspot] Auto-anchor:', sceneId, hotspotId, 'from mesh', child.name, 'localPos', { x: localPoint.x, y: localPoint.y, z: localPoint.z });
                    break;
                }
            });
        }

        function initCalibrationTargets() {
            calibrationTargets.length = 0;
            for (const [sceneId, list] of Object.entries(HOTSPOTS_BY_SCENE)) {
                list.forEach((def, index) => {
                    calibrationTargets.push({ sceneId, index, id: def.id });
                });
            }
        }

        function setCalibrationTarget(index) {
            if (index >= 0 && index < calibrationTargets.length) {
                calibrationTarget = calibrationTargets[index];
                console.log('[Calibration] Target:', calibrationTarget.id, calibrationTarget.sceneId);
            }
        }

        function initThree() {
            canvas = $('#three-canvas');
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
            camera.position.set(0, 0, 800);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;

            const ambient = new THREE.AmbientLight(0x404040, 1.2);
            scene.add(ambient);
            const dir = new THREE.DirectionalLight(0xffffff, 1.5);
            dir.position.set(200, 300, 400);
            scene.add(dir);
            const fill = new THREE.DirectionalLight(0x88ccff, 0.4);
            fill.position.set(-200, 100, 200);
            scene.add(fill);

            laptopGroup = new THREE.Group();
            scene.add(laptopGroup);

            const gltfLoader = new GLTFLoader();
            gltfLoader.load(GLB_PATH, (gltf) => {
                const model = gltf.scene;
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                model.position.sub(center);
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 400 / maxDim;
                model.scale.setScalar(scale);
                model.position.y -= 200; /* bajar modelo para centrarlo verticalmente */
                laptopGroup.add(model);
                glbModel = model;

                model.traverse((child) => {
                    if (child.isMesh) {
                        const n = (child.name || '').toLowerCase();
                        if (n.includes('lid') || n.includes('screen') || n.includes('display') || n.includes('top') || n.includes('hinge')) {
                            lidMesh = child;
                        }
                    }
                });

                tryAutoAnchors(model);
                buildHotspotDoms();
                window.threeReady = true;
                if (window.onThreeReady) window.onThreeReady();
                ScrollTrigger.refresh(true);
            }, undefined, (err) => {
                console.error('GLB load error:', err);
            });

            window.addEventListener('resize', () => {
                const w = canvas.clientWidth;
                const h = canvas.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            });

            raycaster = new THREE.Raycaster();
            mouseNDC = new THREE.Vector2();
            window.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() === 'c') {
                    calibrationMode = !calibrationMode;
                    const cross = $('#hotspot-crosshair');
                    if (cross) cross.style.display = calibrationMode ? 'block' : 'none';
                    if (calibrationMode && calibrationTargets.length) calibrationTarget = calibrationTargets[0];
                    console.log('[Calibration] Mode', calibrationMode ? 'ON (1-6 select hotspot)' : 'OFF');
                }
                if (calibrationMode && e.key >= '1' && e.key <= '9') {
                    const i = parseInt(e.key, 10) - 1;
                    setCalibrationTarget(i);
                }
                if (e.key.toLowerCase() === 's') {
                    logHotspotStabilityRanking();
                }
            });
            canvas.addEventListener('click', (e) => {
                if (!calibrationMode || !glbModel || !calibrationTarget) return;
                const rect = canvas.getBoundingClientRect();
                mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                raycaster.setFromCamera(mouseNDC, camera);
                const hits = raycaster.intersectObject(glbModel, true);
                if (hits.length) {
                    const pt = hits[0].point;
                    _localPoint.copy(pt);
                    laptopGroup.worldToLocal(_localPoint);
                    const def = HOTSPOTS_BY_SCENE[calibrationTarget.sceneId][calibrationTarget.index];
                    def.localPos.x = _localPoint.x;
                    def.localPos.y = _localPoint.y;
                    def.localPos.z = _localPoint.z;
                    console.log('[Calibration] localPos for', calibrationTarget.id, ':', JSON.stringify({ x: _localPoint.x, y: _localPoint.y, z: _localPoint.z }));
                    const cross = $('#hotspot-crosshair');
                    if (cross) {
                        cross.style.left = e.clientX + 'px';
                        cross.style.top = e.clientY + 'px';
                    }
                }
            });

        function logHotspotStabilityRanking() {
            const entries = Object.entries(hotspotStats).map(([key, s]) => {
                const total = s.framesVisible + s.framesBad;
                const pct = total > 0 ? (s.framesBad / total * 100).toFixed(1) : '0';
                return { key, ...s, total, pctBad: parseFloat(pct) };
            }).filter(e => e.total > 20);
            entries.sort((a, b) => b.pctBad - a.pctBad);
            console.log('[Hotspot stability] Ranking (% frames near edge or off-screen):');
            entries.forEach((e, i) => console.log(`  ${i + 1}. ${e.key}  ${e.pctBad}% bad (${e.framesBad}/${e.total})`));
        }

            let lastLogTime = 0;
            function render() {
                requestAnimationFrame(render);
                if (!laptopGroup) return;
                laptopGroup.rotation.x = rigData.rotationX * D2R;
                laptopGroup.rotation.y = rigData.rotationY * D2R;
                laptopGroup.rotation.z = rigData.rotationZ * D2R;
                laptopGroup.scale.setScalar(rigData.scale);
                laptopGroup.position.x = (rigData.xPercent / 100) * 120;
                laptopGroup.position.y = rigData.positionY;
                if (lidMesh) lidMesh.rotation.x = lidData.rotationX * D2R;
                canvas.style.opacity = rigData.opacity;
                camera.position.set(cameraData.x, cameraData.y, cameraData.z);
                camera.lookAt(cameraData.lookAtX, cameraData.lookAtY, cameraData.lookAtZ);
                camera.updateMatrixWorld();
                // Hotspots: anchor exacto; label+line con offset (side); flip si label fuera viewport; métrica estabilidad
                if (activeHotspotsScene && hotspotDoms[activeHotspotsScene]) {
                    hotspotFrameCounter++;
                    const list = hotspotDoms[activeHotspotsScene];
                    const cw = canvas.clientWidth;
                    const ch = canvas.clientHeight;
                    const offsetPx = HOTSPOT_OFFSET_PX;
                    const sideAngle = { right: 0, left: 180, top: -90, bottom: 90 };
                    for (let i = 0; i < list.length; i++) {
                        const { el, lineEl, labelEl, def } = list[i];
                        if (!el.classList.contains('is-visible')) continue;
                        _vec3.set(def.localPos.x, def.localPos.y, def.localPos.z);
                        laptopGroup.localToWorld(_vec3);
                        _ndc.copy(_vec3).project(camera);
                        const nearEdge = Math.abs(_ndc.x) > EDGE_NDC || Math.abs(_ndc.y) > EDGE_NDC;
                        const offScreen = _ndc.z > 1 || _ndc.z < -1 || _ndc.x < -1.2 || _ndc.y < -1.2 || _ndc.x > 1.2 || _ndc.y > 1.2;
                        const key = activeHotspotsScene + '-' + def.id;
                        if (!hotspotStats[key]) hotspotStats[key] = { framesVisible: 0, framesBad: 0 };
                        hotspotStats[key].framesVisible++;
                        if (nearEdge || offScreen) hotspotStats[key].framesBad++;
                        if (offScreen) {
                            hardHide(el);
                            continue;
                        }
                        const sx = (_ndc.x * 0.5 + 0.5) * cw;
                        const sy = (_ndc.y * -0.5 + 0.5) * ch;
                        let angleDeg = sideAngle[def.side] != null ? sideAngle[def.side] : 0;
                        const offset = def.offset != null ? def.offset : offsetPx;
                        const rad = angleDeg * Math.PI / 180;
                        let lx = sx + Math.cos(rad) * offset;
                        let ly = sy + Math.sin(rad) * offset;
                        if (lx < 0 || lx > cw || ly < 0 || ly > ch) {
                            angleDeg += 180;
                            const rad2 = angleDeg * Math.PI / 180;
                            lx = sx + Math.cos(rad2) * offset;
                            ly = sy + Math.sin(rad2) * offset;
                        }
                        el.style.transform = `translate3d(${sx}px,${sy}px,0)`;
                        lineEl.style.width = offset + 'px';
                        lineEl.style.transform = `rotate(${angleDeg}deg)`;
                        labelEl.style.left = (Math.cos(angleDeg * Math.PI / 180) * offset) + 'px';
                        labelEl.style.top = (Math.sin(angleDeg * Math.PI / 180) * offset) + 'px';
                        labelEl.style.marginLeft = '0';
                    }
                    const t = performance.now();
                    if (t - lastLogTime > LOG_STATS_INTERVAL_MS) {
                        lastLogTime = t;
                        logHotspotStabilityRanking();
                    }
                }
                renderer.render(scene, camera);
            }
            render();
        }

        function hardHide(el) {
            if (!el) return;
            el.classList.remove('is-visible');
            el.style.transform = 'translate3d(-9999px,-9999px,0)';
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el._hotspotShown = false;
        }

        function hardHideAll() {
            const container = $('#hotspots-container');
            if (!container) return;
            (container.querySelectorAll('.hotspot') || []).forEach(hardHide);
        }

        function buildHotspotDoms() {
            initCalibrationTargets();
            const container = $('#hotspots-container');
            if (!container) return;
            for (const [sceneId, list] of Object.entries(HOTSPOTS_BY_SCENE)) {
                hotspotDoms[sceneId] = [];
                for (const def of list) {
                    const el = document.createElement('div');
                    el.className = 'hotspot';
                    el.setAttribute('data-scene', sceneId);
                    el.setAttribute('data-id', def.id);
                    el._hotspotShown = false;
                    const lineEl = document.createElement('div');
                    lineEl.className = 'hotspot-line';
                    const labelEl = document.createElement('span');
                    labelEl.className = 'hotspot-label pulse';
                    labelEl.textContent = def.label;
                    el.appendChild(lineEl);
                    el.appendChild(labelEl);
                    container.appendChild(el);
                    hotspotDoms[sceneId].push({ el, lineEl, labelEl, def });
                }
            }
        }

        function setHotspotsProgress(sceneId, progress) {
            const list = hotspotDoms[sceneId];
            if (!list) return;
            for (const { el, def } of list) {
                const visible = progress >= def.tIn && progress <= def.tOut;
                if (visible) {
                    if (!el._hotspotShown) {
                        el._hotspotShown = true;
                        el.classList.add('is-visible');
                        gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: true });
                    }
                } else {
                    if (el._hotspotShown) {
                        el._hotspotShown = false;
                        el.classList.remove('is-visible');
                        gsap.to(el, { autoAlpha: 0, duration: 0.15, overwrite: true, onComplete: () => hardHide(el) });
                    } else {
                        hardHide(el);
                    }
                }
            }
        }

        function setActiveHotspots(sceneId) {
            if (sceneId == null) {
                hardHideAll();
                activeHotspotsScene = null;
                return;
            }
            hardHideAll();
            activeHotspotsScene = sceneId;
            const list = hotspotDoms[sceneId];
            if (!list) return;
            list.forEach(({ el }) => { el._hotspotShown = false; });
        }

        initThree();

        class Director {
            constructor() {
                this.state = { locked: true, currentScene: 0, reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches };
                this.dom = {
                    body: $('body'),
                    iris: $('#iris'),
                    hudText: $('#scene-indicator'),
                    bar: $('#progress-bar')
                };
                this.rigData = rigData;
                this.lidData = lidData;
                this.cameraData = cameraData;
                this.setActiveHotspots = setActiveHotspots;
                this.setHotspotsProgress = setHotspotsProgress;
                this.init();
            }

            init() {
                this.runPreloader();
                this.setupThemes();
            }

            runPreloader() {
                const tl = gsap.timeline();
                tl.to('#loader-line', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
                  .to('#loader-text', { text: "SYSTEM READY", duration: 0.5, snap: "text" })
                  .to('#enter-btn', { opacity: 1, pointerEvents: 'auto', duration: 0.5 });
                $('#enter-btn').addEventListener('click', () => this.unlockVault());
            }

            unlockVault() {
                const tl = gsap.timeline({
                    onComplete: () => {
                        this.state.locked = false;
                        this.dom.body.classList.remove('is-locked');
                        const wait = () => {
                            if (window.threeReady) this.initScrollScenes();
                            else requestAnimationFrame(wait);
                        };
                        wait();
                        this.runHeroIntro();
                    }
                });
                tl.to('#preloader', { opacity: 0, duration: 0.5 })
                  .to(this.dom.iris, { clipPath: 'circle(0% at 50% 50%)', duration: 1.5, ease: 'power4.inOut' })
                  .to(this.rigData, { positionY: 0, opacity: 1, rotationX: 0, duration: 2, ease: 'power3.out' }, "-=1.0");
            }

            runHeroIntro() {
                const heroEl = $('#hero-intro');
                const indicatorEl = $('#hero-intro-indicator');
                if (!heroEl) return;
                heroEl.style.display = '';
                heroEl.classList.add('is-visible');
                const tlIntro = gsap.timeline();
                tlIntro.fromTo(heroEl, { autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' });
                if (!this.state.reducedMotion && indicatorEl) {
                    this.heroIntroLoop = gsap.to(indicatorEl, { scaleY: 0.4, duration: 0.9, yoyo: true, repeat: -1, ease: 'power2.inOut' });
                }
                const onFirstScroll = () => {
                    window.removeEventListener('wheel', onFirstScroll);
                    window.removeEventListener('touchmove', onFirstScroll);
                    this.closeHeroIntro();
                };
                window.addEventListener('wheel', onFirstScroll, { passive: true });
                window.addEventListener('touchmove', onFirstScroll, { passive: true });
            }

            closeHeroIntro() {
                if (this._heroIntroClosed) return;
                this._heroIntroClosed = true;
                const heroEl = $('#hero-intro');
                if (!heroEl) return;
                if (this.heroIntroLoop) {
                    this.heroIntroLoop.kill();
                    this.heroIntroLoop = null;
                }
                gsap.to(heroEl, {
                    autoAlpha: 0,
                    scale: 0.98,
                    filter: 'blur(12px)',
                    duration: 0.4,
                    ease: 'power2.in',
                    onComplete: () => {
                        heroEl.style.display = 'none';
                        heroEl.classList.remove('is-visible');
                        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(true);
                    }
                });
            }

            setupThemes() {
                $$('section').forEach(section => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => this.setTheme(section.id),
                        onEnterBack: () => this.setTheme(section.id)
                    });
                });
                ScrollTrigger.create({
                    trigger: '#scroll-track',
                    start: 'top top',
                    end: 'bottom bottom',
                    onUpdate: (self) => gsap.set(this.dom.bar, { height: `${self.progress * 100}%` })
                });
            }

            setTheme(sceneId) {
                let theme = 'stealth', label = 'Sector 01: Artifact';
                switch (sceneId) {
                    case 'scene-2': theme = 'power'; label = 'Sector 02: Core'; break;
                    case 'scene-3': theme = 'stealth'; label = 'Sector 03: Materials'; break;
                    case 'scene-ports': theme = 'ports'; label = 'Sector 04: I/O'; break;
                    case 'scene-4': theme = 'display'; label = 'Sector 05: Optics'; break;
                    case 'scene-display-detail': theme = 'display'; label = 'Sector 06: Panel'; break;
                    case 'scene-5': theme = 'xray'; label = 'Sector 07: Anatomy'; break;
                    case 'scene-undercarriage': theme = 'airflow'; label = 'Sector 08: Underside'; break;
                    case 'scene-6': theme = 'stealth'; label = 'Sector 09: Verdict'; break;
                }
                this.dom.body.setAttribute('data-theme', theme);
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let iterations = 0;
                const target = label;
                const interval = setInterval(() => {
                    this.dom.hudText.innerText = target.split("").map((letter, index) => {
                        if (index < iterations) return target[index];
                        return chars[Math.floor(Math.random() * 36)];
                    }).join("");
                    if (iterations >= target.length) clearInterval(interval);
                    iterations += 1 / 3;
                }, 30);
            }

            initScrollScenes() {
                const scrubVal = this.state.reducedMotion ? 0.8 : 1.2;

                // Master timeline: único control de rigData / lidData / cameraData (evita solapamiento)
                const tlModel = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#scroll-track',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: scrubVal,
                        invalidateOnRefresh: true
                    }
                });

                tlModel.addLabel('scene-1', 0);
                tlModel.to(this.rigData, { rotationX: 60, rotationZ: -15, scale: 0.9, duration: 1, ease: 'power1.inOut' }, 0);
                tlModel.to(this.lidData, { rotationX: -20, duration: 0.8, ease: 'power1.inOut' }, 0);
                tlModel.to('#scene-1 .scene-text', { opacity: 1, y: 0, duration: 0.6 }, 0);

                tlModel.addLabel('scene-2', 1);
                tlModel.to(this.rigData, { rotationX: 50, rotationZ: 10, xPercent: 10, scale: 1.1, duration: 1, ease: 'power1.inOut' }, 1);
                tlModel.to('#scene-2 .scene-text', { opacity: 1, y: 0, duration: 0.6 }, 1);

                tlModel.addLabel('scene-3', 2);
                tlModel.to(this.rigData, { rotationX: 20, rotationY: 180, xPercent: 0, scale: 0.8, duration: 1, ease: 'power1.inOut' }, 2);
                tlModel.to('#scene-3 .scene-text', { opacity: 1, y: 0, duration: 0.6 }, 2);

                tlModel.addLabel('scene-ports', 3);
                tlModel.to(this.cameraData, { x: 90, z: 580, lookAtX: -100, lookAtY: -80, lookAtZ: 25, duration: 0.4, ease: 'power1.inOut' }, 3);
                tlModel.to(this.rigData, { rotationY: -28, rotationX: 52, scale: 0.92, duration: 0.4, ease: 'power1.inOut' }, 3);
                tlModel.to(this.cameraData, { lookAtX: -170, lookAtY: -90, lookAtZ: 35, duration: 0.2, ease: 'power1.inOut' }, 3.4);
                tlModel.to('#scene-ports .scene-text', { opacity: 1, y: 0, duration: 0.35 }, 3.2);
                tlModel.to(this.cameraData, { x: 0, y: 0, z: 800, lookAtX: 0, lookAtY: 0, lookAtZ: 0, duration: 0.4, ease: 'power1.inOut' }, 3.6);
                tlModel.to(this.rigData, { rotationX: 90, rotationY: 0, rotationZ: 0, scale: 1.3, duration: 0.4, ease: 'power1.inOut' }, 3.6);
                tlModel.to(this.lidData, { rotationX: 0, duration: 0.4, ease: 'power1.inOut' }, 3.6);

                tlModel.addLabel('scene-4', 4);
                tlModel.to('#scene-4 .scene-text', { opacity: 1, y: 0, duration: 0.6 }, 4);

                tlModel.addLabel('scene-display-detail', 5);
                tlModel.to(this.cameraData, { y: 30, z: 650, lookAtY: 50, lookAtZ: 150, duration: 0.35, ease: 'power1.inOut' }, 5);
                tlModel.to(this.rigData, { rotationX: 88, scale: 1.25, duration: 0.35, ease: 'power1.inOut' }, 5);
                tlModel.to('#scene-display-detail .scene-text', { opacity: 1, y: 0, duration: 0.3 }, 5.2);
                tlModel.to(this.cameraData, { x: 0, y: 0, z: 800, lookAtX: 0, lookAtY: 0, lookAtZ: 0, duration: 0.35, ease: 'power1.inOut' }, 5.35);

                tlModel.addLabel('scene-5', 6);
                tlModel.to(this.rigData, { rotationX: 60, rotationZ: 45, scale: 0.7, duration: 1, ease: 'power1.inOut' }, 6);
                tlModel.to(this.lidData, { rotationX: -90, duration: 0.6, ease: 'power1.inOut' }, 6);
                tlModel.to('#scene-5 .scene-text', { opacity: 1, y: 0, duration: 0.6 }, 6);

                tlModel.addLabel('scene-undercarriage', 7);
                tlModel.to(this.cameraData, { y: -120, z: 620, lookAtY: -150, lookAtZ: 0, duration: 0.4, ease: 'power1.inOut' }, 7);
                tlModel.to(this.rigData, { rotationX: 75, rotationY: 0, rotationZ: 0, scale: 0.85, duration: 0.4, ease: 'power1.inOut' }, 7);
                tlModel.to('#scene-undercarriage .scene-text', { opacity: 1, y: 0, duration: 0.35 }, 7.2);
                tlModel.to(this.cameraData, { x: 0, y: 0, z: 800, lookAtX: 0, lookAtY: 0, lookAtZ: 0, duration: 0.35, ease: 'power1.inOut' }, 7.4);

                tlModel.addLabel('scene-6', 8);
                tlModel.to(this.lidData, { rotationX: -20, duration: 0.5, ease: 'power1.inOut' }, 8);
                tlModel.to(this.rigData, { rotationX: 75, rotationZ: -10, rotationY: 360, scale: 1, duration: 1, ease: 'power1.inOut' }, 8);

                // UI only: hotspots con ventana tIn/tOut; onLeave hard hide todos
                ['scene-ports', 'scene-display-detail', 'scene-undercarriage'].forEach((sceneId) => {
                    ScrollTrigger.create({
                        trigger: '#' + sceneId,
                        start: 'top 60%',
                        end: 'bottom 40%',
                        onEnter: () => this.setActiveHotspots(sceneId),
                        onEnterBack: () => this.setActiveHotspots(sceneId),
                        onLeaveBack: () => this.setActiveHotspots(null),
                        onLeave: () => this.setActiveHotspots(null),
                        onUpdate: (self) => this.setHotspotsProgress(sceneId, self.progress)
                    });
                });
                ScrollTrigger.refresh(true);
            }
        }

        if (document.readyState === 'complete') { window.director = new Director(); } else { window.addEventListener('load', () => { window.director = new Director(); }); }