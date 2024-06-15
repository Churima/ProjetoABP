import React, { useState, useEffect } from 'react';
import './Cronometro.css';

function Cronometro() {
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState('');
  const [activityTime, setActivityTime] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const addActivity = () => {
    if (activityName && activityTime) {
      setActivities([...activities, { name: activityName, time: activityTime }]);
      setActivityName('');
      setActivityTime('');
    }
  };

  const selectActivity = (activity) => {
    setSelectedActivity(activity);
    setRemainingTime(parseInt(activity.time, 10));
  };

  const startTimer = () => {
    if (remainingTime > 0) {
      setIsRunning(true);
    }
  };

  const formatTime = (time) => {
    const totalSeconds = parseInt(time, 10);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
  };

  return (
    <div className="cronometro-container">
      <div className="add-activity">
        <input
          type="text"
          placeholder="O que você quer fazer?"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <input
          type="number"
          placeholder="00:00:00"
          value={activityTime}
          onChange={(e) => setActivityTime(e.target.value)}
        />
        <button onClick={addActivity}>Adicionar</button>
      </div>
      <div className="activities-list">
        <h2>Atividades do dia</h2>
        {activities.map((activity, index) => (
          <button 
            key={index} 
            onClick={() => selectActivity(activity)} 
            className="activity-button"
          >
            {activity.name} ({formatTime(activity.time)})
          </button>
        ))}
      </div>
      {selectedActivity && (
        <div className="cronometro">
          <h2 className="titulo">{selectedActivity.name}</h2>
          <div className="relogioWrapper time-display">
            {new Date(remainingTime * 1000).toISOString().substr(11, 8)}
          </div>
          <button onClick={startTimer}>Iniciar</button>
        </div>
      )}
    </div>
  );
}

export default Cronometro;
