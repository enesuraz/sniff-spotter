function InfoGrid({ dog }) {
  return (
    <div className="info-grid">
      <div className="info-item">
        <span>🦮</span>
        <span>{dog.trainability}/5</span>
        <span>Trainibility</span>
      </div>
      <div className="info-item">
        <span>🐕</span>
        <span>{dog.barking}/5</span>
        <span>Barking</span>
      </div>
      <div className="info-item">
        <span>🐶</span>
        <span>{dog.energy}/5</span>
        <span>Energy</span>
      </div>
      <div className="info-item">
        <span>🐕‍🦺</span>
        <span>{dog.protectiveness}/5</span>
        <span>Protectiveness</span>
      </div>
      <div className="info-item">
        <span>🐩</span>
        <span>{dog.shedding}/5</span>
        <span>Shedding</span>
      </div>
      <div className="info-item">
        <span>🐩</span>
        <span>{dog.max_life_expectancy}</span>
        <span>Max Life Expect</span>
      </div>
    </div>
  );
}

export default InfoGrid;
