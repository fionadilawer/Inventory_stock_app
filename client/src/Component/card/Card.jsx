import styles from './Card.modules.scss';

const Card = ({ children, cardClass }) => {
  return (
    <div> <div className={`${styles.card} ${cardClass}`}>{children}</div>;</div>
  )
}

export default Card;
