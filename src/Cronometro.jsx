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
      if (selectedActivity && selectedActivity.name.toLowerCase() === 'lucas') {
        window.location.href = 'https://www.youtube.com/shorts/CQULp6djUN8';
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime, selectedActivity]);

  const addActivity = () => {
    const totalSeconds = parseTime(activityTime);
    if (activityName && totalSeconds > 0) {
      setActivities([...activities, { name: activityName, time: totalSeconds }]);
      setActivityName('');
      setActivityTime('');
    }
  };

  const selectActivity = (activity) => {
    setSelectedActivity(activity);
    setRemainingTime(activity.time);
  };

  const deleteActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
    if (selectedActivity === activities[index]) {
      setSelectedActivity(null);
      setIsRunning(false);
      setRemainingTime(null);
    }
  };

  const startTimer = () => {
    if (remainingTime > 0) {
      setIsRunning(true);
    }
  };

  const parseTime = (timeString) => {
    const timeParts = timeString.split(':').map(Number);
    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      return (hours * 3600) + (minutes * 60) + seconds;
    } else if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      return (minutes * 60) + seconds;
    } else if (timeParts.length === 1) {
      const [seconds] = timeParts;
      return seconds;
    }
    return 0;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    const regex = /^(\d{0,2}:)?(\d{0,2}:)?(\d{0,2})$/;
    if (regex.test(value)) {
      setActivityTime(value);
    }
  };

  return (
    <div className="main-container">
      <div className='left-container'>
        <div className="add-activity">
          <input
            type="text"
            placeholder="O que você quer fazer?"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <input
            type="text"
            placeholder="HH:MM:SS"
            value={activityTime}
            onChange={handleTimeChange}
          />
          <button onClick={addActivity}>Adicionar</button>
        </div>
        <div className='cronometro-container'>
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
      </div>
      <div className='right-container'>
        <div className="activities-list">
          <h2>Atividades do dia</h2>
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <button onClick={() => selectActivity(activity)} className="activity-button">
                {activity.name} ({formatTime(activity.time)})
              </button>
              <button onClick={() => deleteActivity(index)} className="delete-button">Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cronometro;
