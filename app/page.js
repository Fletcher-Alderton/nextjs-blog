import './homepage.css';
import data from 'public/HomePage.json';
import featurearticle from 'public/featurearticle.json';
import Navbar from './components/navbar';
import './/components/navbar'

export default function HomePage() {
  return (
    <>
      {/* Icon */}
      <div className='icon'>
        <img></img>
      </div>
      {/* Navbar */}
      <div className='navbar'>
        <Navbar />
      </div>
      {/* Horizontal Line */}
      <div className='hr-line'></div>
      {/* Big Text */}
      <div>
        <h1 className='bigtext'>MOSTLY TECH</h1>
      </div>
      {/* Horizontal Line */}
      <div className='hr-line'></div>
      {/* Articles */}
      <div class="container">
        <div className='feature-container'>
          {/* Feature Articles */}
          {featurearticle.map((entry, index) => (
            <a href={entry.link} key={index} className='feature-link'>
              <div className='feature-entry'>
                <div className='feature-thumbnail'>
                  <img src={entry.thumbnail} alt={`${entry.title} Thumbnail`} />
                </div>
                <div className='feature-details'>
                  <h2 className='feature-title'>{entry.title}</h2>
                  <p className='feature-description'>{entry.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        {/* Normal Articles */}
        <div className='normal-container'>
          {data.map((entry, index) => (
            <a href={entry.link} key={index} className='normal-link'>
              <div className='normal-entry'>
                <div className='normal-thumbnail'>
                  <img src={entry.thumbnail} alt={`${entry.title} Thumbnail`} />
                </div>
                <div className='normal-details'>
                  <h2 className='normal-title'>{entry.title}</h2>
                  <p className='normal-description'>{entry.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
