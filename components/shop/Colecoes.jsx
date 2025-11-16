import styles from './Colecoes.module.css';

const Colecoes = ({ collections }) => {
  return (
    <section className={styles.colecoes}>
      <h2 className={styles.title}>Coleções</h2>
      <div className={styles.grid}>
        {collections.map((collection, index) => (
          <div key={index} className={styles.collectionItem}>
            <h3>{collection.title}</h3>
            <video
              src={collection.src}
              autoPlay
              muted
              loop
              playsInline
              className={styles.video}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Colecoes;
