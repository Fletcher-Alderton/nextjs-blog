import './homepage.css';
import data from 'public/HomePage.json';
import Header from './components/header';
import './/components/header.css'

export default function HomePage() {
  return (
    <>
    <Header />
    <div>
      <h1 className='bigtext'>MOSTLY TECH</h1>
    </div>
    <hr></hr>
    <div className='container'>
    <hr></hr>
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
      </div></>
  );
}
