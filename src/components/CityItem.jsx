import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

import cityStore from '../stores/cityStore';

import { motion, AnimatePresence } from 'framer-motion';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />;
};

const CityItem = ({ city }) => {
  const { currentCity, removeCity } = cityStore();
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  const handleRemoveClicked = (e) => {
    e.preventDefault();
    removeCity(id);
  };

  return (
    <motion.li key={id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
      <Link className={`${styles.cityItem} ${id === currentCity?.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleRemoveClicked}>
          &times;
        </button>
      </Link>
    </motion.li>
  );
};

export default CityItem;
