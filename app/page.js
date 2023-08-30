import './homepage.css';
import data from 'public/HomePage.json';

export default function HomePage() {
  return (
    <div className='container'>
      {data.map((entry, index) => (
        <a href={entry.link} key={index} className='styles.link'>
          <div className='entry'>
            <div className='thumbnail'>
              <img src={entry.thumbnail} alt={`${entry.title} Thumbnail`} />
            </div>
            <div className='details'>
              <h2 className='title'>{entry.title}</h2>
              <p className='description'>{entry.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
