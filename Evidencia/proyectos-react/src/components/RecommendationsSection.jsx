import React, { useState, useEffect } from 'react';

/**
 * RecommendationsSection Component
 * Sección de proyectos recomendados basada en interacciones
 */
const RecommendationsSection = ({ projects }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = () => {
    try {
      const stored = localStorage.getItem('portfolio_interactions');
      const interactions = stored ? JSON.parse(stored) : {};

      if (Object.keys(interactions).length < 2) {
        setShowSection(false);
        return;
      }

      const scoredProjects = projects
        .map((project) => {
          const link = project.link;
          const interaction = interactions[link] || {
            count: 0,
            totalDuration: 0,
          };
          const category = project.categoryFilter;

          const visitScore = interaction.count * 10;
          const durationScore = interaction.totalDuration / 1000;
          const categoryScore = getCategoryScore(category, interactions);
          const recencyScore = getRecencyScore(interaction.lastVisit);

          const totalScore = visitScore + durationScore + categoryScore + recencyScore;

          return {
            project,
            score: totalScore,
            interaction,
          };
        })
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      if (scoredProjects.length > 0) {
        setRecommendations(scoredProjects);
        setShowSection(true);
      } else {
        setShowSection(false);
      }
    } catch (error) {
      console.log('Error al cargar recomendaciones:', error);
      setShowSection(false);
    }
  };

  const getCategoryScore = (category, interactions) => {
    const categoryVisits = Object.values(interactions)
      .filter((i) => i.category === category)
      .reduce((sum, i) => sum + i.count, 0);
    return categoryVisits * 5;
  };

  const getRecencyScore = (lastVisit) => {
    if (!lastVisit) return 0;
    const daysSinceVisit = (Date.now() - lastVisit) / (1000 * 60 * 60 * 24);
    return Math.max(0, 20 - daysSinceVisit);
  };

  const recordInteraction = (projectLink, category) => {
    try {
      const stored = localStorage.getItem('portfolio_interactions');
      const interactions = stored ? JSON.parse(stored) : {};

      const key = projectLink;
      if (!interactions[key]) {
        interactions[key] = {
          count: 0,
          totalDuration: 0,
          category: category,
          lastVisit: Date.now(),
        };
      }

      interactions[key].count++;
      interactions[key].lastVisit = Date.now();

      localStorage.setItem('portfolio_interactions', JSON.stringify(interactions));
      
      // Recargar recomendaciones
      setTimeout(() => loadRecommendations(), 500);
    } catch (error) {
      console.log('Error al registrar interacción:', error);
    }
  };

  if (!showSection || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations-section" id="recommendationsSection">
      <div className="recommendations-title">PROYECTOS RECOMENDADOS</div>
      <div className="recommendations-grid" id="recommendationsGrid">
        {recommendations.map(({ project, interaction }) => (
          <div
            key={project.id}
            className="recommendation-card"
            onClick={() => {
              recordInteraction(project.link, project.categoryFilter);
              if (project.link) {
                window.open(project.link, '_blank');
              }
            }}
          >
            <span className="recommendation-badge">
              {interaction.count} visita{interaction.count !== 1 ? 's' : ''}
            </span>
            <div className="recommendation-artist">{project.artist}</div>
            <div className="recommendation-album">{project.album}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
