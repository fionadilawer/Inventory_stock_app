import styles from './Card.module.scss';

const Card = ({ children, cardClass }) => {
  return (
    <div>
      <div className={`${styles.card} ${cardClass}`}>{children}</div>;
    </div>
  )
};

export default Card;


