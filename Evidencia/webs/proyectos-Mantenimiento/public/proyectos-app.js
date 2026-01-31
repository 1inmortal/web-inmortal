// --- 0. PLAN + CONTACT + SMOOTH SCROLL ---
        (function() {
            var planNames = { preventivo: 'Mantenimiento Preventivo ($35 USD)', total: 'Renovación Total ($60 USD)' };
            function applyPlanToContact() {
                var hash = window.location.hash || '';
                var plan = null;
                if (hash.indexOf('plan=') !== -1) {
                    var m = hash.match(/plan=(\w+)/);
                    if (m) plan = m[1];
                }
                if (!plan) plan = sessionStorage.getItem('contactPlan');
                var input = document.getElementById('contact-plan');
                var summary = document.getElementById('contact-plan-summary');
                if (input && plan && (plan === 'preventivo' || plan === 'total')) {
                    input.value = plan;
                    if (summary) {
                        summary.innerHTML = '<span class="contact-plan-badge">Plan elegido: ' + (planNames[plan] || plan) + '</span>';
                    }
                } else if (summary) summary.innerHTML = '';
            }
            document.querySelectorAll('a[href="#contact"][data-plan]').forEach(function(a) {
                a.addEventListener('click', function() {
                    sessionStorage.setItem('contactPlan', this.getAttribute('data-plan'));
                });
            });
            window.addEventListener('hashchange', applyPlanToContact);
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyPlanToContact);
            else applyPlanToContact();

            var form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var name = (document.getElementById('contact-name') || {}).value;
                    var email = (document.getElementById('contact-email') || {}).value;
                    var statusEl = document.getElementById('form-status');
                    var btn = document.getElementById('contact-submit');
                    if (!name || !email) {
                        if (statusEl) { statusEl.textContent = 'Por favor completa nombre y email.'; statusEl.className = 'form-status error'; }
                        return;
                    }
                    if (statusEl) statusEl.textContent = '';
                    if (btn) { btn.classList.add('btn-loading'); btn.disabled = true; btn.textContent = 'Enviando...'; }
                    setTimeout(function() {
                        if (statusEl) { statusEl.textContent = 'Mensaje recibido. Te responderemos en menos de 24 h.'; statusEl.className = 'form-status success'; }
                        if (btn) { btn.classList.remove('btn-loading'); btn.disabled = false; btn.textContent = 'Contactar Ahora'; }
                        form.reset();
                        document.getElementById('contact-plan').value = '';
                        document.getElementById('contact-plan-summary').innerHTML = '';
                    }, 1200);
                });
            }
        })();

        // --- 1. SETUP THREE.JS SCENE ---
        const canvasContainer = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        // Fog for depth and seamless blend with background
        scene.fog = new THREE.FogExp2(0x0b0b0f, 0.05);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 8); // Initial position

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvasContainer.appendChild(renderer.domElement);

        // --- 2. LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        // Key Light (Blue-ish cool light)
        const keyLight = new THREE.DirectionalLight(0x3b82f6, 2);
        keyLight.position.set(5, 10, 7);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        scene.add(keyLight);

        // Fill Light (Warm/Neutral)
        const fillLight = new THREE.PointLight(0xffffff, 0.5);
        fillLight.position.set(-5, 2, 5);
        scene.add(fillLight);

        // Rim Light (Cyberpunk accent)
        const rimLight = new THREE.SpotLight(0x60a5fa, 5);
        rimLight.position.set(0, 5, -5);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);

        // --- 3. LAPTOP MODEL (GLB: Dell XPS) ---
        const laptopGroup = new THREE.Group();
        scene.add(laptopGroup);

        // Dummy objects para que las animaciones GSAP no fallen (modelo GLB es un solo mesh)
        const screenMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: 0x111111,
            roughness: 0.2,
            metalness: 0.5
        });
        const baseGroup = new THREE.Group();
        laptopGroup.add(baseGroup);
        const keyboard = new THREE.Group();
        keyboard.position.set(0, 0.1, -0.1);
        baseGroup.add(keyboard);
        const internalsGroup = new THREE.Group();
        internalsGroup.visible = false;
        baseGroup.add(internalsGroup);

        const screenPivot = new THREE.Group();
        screenPivot.position.set(0, 0.075, -1);
        laptopGroup.add(screenPivot);

        // Cargar modelo laptop_dell_xps.glb (base path para GitHub Pages)
        var glbBase = '/';
        (function () {
            var scripts = document.querySelectorAll('script[src*="proyectos-app.js"]');
            if (scripts.length) {
                var url = new URL(scripts[scripts.length - 1].src);
                glbBase = url.pathname.replace(/proyectos-app\.js.*$/, '');
                if (!glbBase.endsWith('/')) glbBase += '/';
            }
        })();
        const gltfLoader = new THREE.GLTFLoader();
        gltfLoader.load(glbBase + 'laptop_dell_xps.glb', function (gltf) {
            const model = gltf.scene;
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            model.scale.setScalar(scale);
            model.position.set(0, 0, 0);
            laptopGroup.add(model);
            // Ocultar loader y arrancar animaciones al scroll cuando el modelo esté listo
            const loaderEl = document.getElementById('loader');
            if (loaderEl) {
                loaderEl.style.opacity = '0';
                setTimeout(function () { loaderEl.remove(); }, 500);
            }
            initScrollAnimations();
        }, undefined, function (err) {
            console.error('Error cargando laptop_dell_xps.glb:', err);
            const loaderEl = document.getElementById('loader');
            if (loaderEl) { loaderEl.remove(); }
            initScrollAnimations();
        });

        laptopGroup.rotation.y = -Math.PI / 6;
        laptopGroup.rotation.z = Math.PI / 12;


        // --- 4. PARTICLES SYSTEM (For Dust/Cleaning) ---
        const particlesGeo = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x88ccff,
            transparent: true,
            opacity: 0
        });
        const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particlesMesh);


        // --- 5. ANIMATION LOOP & RESIZE ---
        function animate() {
            requestAnimationFrame(animate);
            
            // Subtle floating idle animation
            const time = Date.now() * 0.001;
            if(!gsap.isTweening(laptopGroup.position)) {
                laptopGroup.position.y += Math.sin(time) * 0.001;
            }

            // Animate particles if visible
            if(particlesMat.opacity > 0) {
                particlesMesh.rotation.y = time * 0.1;
                particlesMesh.position.y += 0.005;
            }

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Loader y animaciones se inician cuando el modelo GLB termina de cargar (ver callback de gltfLoader.load)

        // --- 6. GSAP SCROLLTRIGGER ---
        gsap.registerPlugin(ScrollTrigger);

        function initScrollAnimations() {
            ScrollTrigger.refresh();
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    snap: { snapTo: 1/5, duration: 0.35, ease: "power2.inOut" }, // Aterriza en cada capítulo (6 secciones = 5 intervalos)
                }
            });

            // --- SECTION 1 -> 2: DIAGNOSIS (Open Laptop) ---
            tl.to(laptopGroup.rotation, { x: 0.2, y: 0, z: 0, duration: 2 }, "start")
              .to(laptopGroup.position, { z: 2, duration: 2 }, "start") // Move closer
              .to(screenPivot.rotation, { x: Math.PI / 2 + 0.2, duration: 2 }, "start") // Open Lid
              .to(screenMat.emissive, { r: 0.2, g: 0.2, b: 0.3, duration: 1 }, "start+=1") // Screen turns on dim
              
              // Fade in Diagnosis Content
              .to("#diagnosis .content-box", { opacity: 1, y: 0, duration: 1 }, "start+=1");


            // --- SECTION 2 -> 3: CLEANING (Exploded View) ---
            // Rotate to top-down-ish view
            tl.to(laptopGroup.rotation, { x: 0.5, y: -0.5, duration: 2 }, "cleaning")
              .to(laptopGroup.position, { x: -1, z: 1, duration: 2 }, "cleaning")
              // Separate parts
              .to(baseGroup.position, { y: -0.5, duration: 2 }, "cleaning")
              .to(keyboard.position, { y: 0.5, duration: 2 }, "cleaning") // Keyboard lifts up
              .call(() => { internalsGroup.visible = true; }, null, "cleaning+=0.5")
              .fromTo(internalsGroup.scale, {x:0, y:0, z:0}, {x:1, y:1, z:1, duration: 1}, "cleaning+=0.5")
              // Particles appear
              .to(particlesMat, { opacity: 0.8, duration: 1 }, "cleaning+=1")
              
              // Fade in Cleaning Content
              .to("#cleaning .content-box", { opacity: 1, y: 0, duration: 1 }, "cleaning+=1");


            // --- SECTION 3 -> 4: INSTALLATION (Reassemble & Windows Glow) ---
            // Hide particles
            tl.to(particlesMat, { opacity: 0, duration: 0.5 }, "install")
              // Reassemble
              .to(baseGroup.position, { y: 0, duration: 1.5 }, "install")
              .to(keyboard.position, { y: 0.1, duration: 1.5 }, "install")
              .to(internalsGroup.scale, { x: 0, y: 0, z: 0, duration: 1 }, "install") // Hide internals
              
              // Rotate to face user
              .to(laptopGroup.rotation, { x: 0.1, y: 0, z: 0, duration: 2 }, "install")
              .to(laptopGroup.position, { x: 0, z: 3, duration: 2 }, "install")
              
              // Screen "Windows" Glow (Cyan/Blue)
              .to(screenMat.emissive, { r: 0, g: 0.5, b: 1, duration: 1 }, "install+=1")
              .to(screenMat.color, { r: 0, g: 0.2, b: 0.8, duration: 1 }, "install+=1")
              
              .to("#install .content-box", { opacity: 1, y: 0, duration: 1 }, "install+=1");


            // --- SECTION 4 -> 5: PRICING (Side View) ---
            tl.to(laptopGroup.position, { x: 3, duration: 2 }, "pricing") // Move right
              .to(laptopGroup.rotation, { y: -0.8, duration: 2 }, "pricing") // Angle away
              .to(screenMat.emissive, { r: 0.1, g: 0.1, b: 0.1, duration: 1 }, "pricing") // Screen dim
              
              // Pricing Content handled by native CSS/HTML flow, but we can animate opacity if needed
              .from(".glass-card", { y: 50, opacity: 0, stagger: 0.2, duration: 1 }, "pricing+=0.5");


            // --- SECTION 5 -> 6: CONTACT (Close Up) ---
            tl.to(laptopGroup.position, { x: 0, y: -1, z: 4.5, duration: 2 }, "contact") // Very close
              .to(laptopGroup.rotation, { x: 0.4, y: 0, duration: 2 }, "contact")
              .to(screenPivot.rotation, { x: Math.PI / 2 - 0.2, duration: 2 }, "contact") // Close lid slightly
              
              .to("#contact form", { opacity: 1, y: 0, duration: 1 }, "contact+=0.5");


            // Progress Bar Logic
            gsap.to('.progress-bar', {
                width: '100%',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0
                }
            });
        }