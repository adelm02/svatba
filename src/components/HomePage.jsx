import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './HomePage.css'
import Carousel from 'react-bootstrap/Carousel';
import pImage from '../assets/p.png'
import pImage2 from '../assets/a.png'


function HomePage() {
  const navigate = useNavigate()

  const [photos, setPhotos] = useState()

  useEffect (() => {
    fetch('http://192.168.100.124:4000/photos')
    .then(res => res.json())
    .then(data => setPhotos(data))
    .catch(err => console.error('Chyba:', err))
  }, []) 
  return (
    <div className= 'carousel-w'> 
        <Carousel>
          {photos?.map(photo => (
            <Carousel.Item key= {photo.id} interval={2000}>
              <iframe src={photo.url} width={380} height={300}></iframe>
            </Carousel.Item>
          ))}
        </Carousel>

        <div>
        <hr className="line"></hr>
        </div>

        <h1 className="wedding-heading">ADÉLKA & PETR<br />HŘÍBKOVI</h1>

        <button className='glow-button' onClick={() => navigate('/quiz')}>
        Spustit svatební kvíz 🤍
        </button>
        
        <label className='glow-button'>
          Přidat svatební fotky 💍
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files
              if (!files.length) return

              Array.from(files).forEach(file => {
                const formData = new FormData()
                formData.append('photo', file)

                fetch('http://192.168.100.124:4000/upload_wedding', {
                  method: 'POST',
                  body: formData
                })
                  .then(res => res.text())
                  .then(data => console.log("Odpověď serveru:", data))
                  .catch(err => console.error("Chyba při odesílání", err))
              })
            }}
            style={{ display: 'none' }}
          />
        </label>

        <label className='glow-button'>
          Vtipné fotky z minulosti
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files
              if (!files.length) return

              Array.from(files).forEach(file => {
                const formData = new FormData()
                formData.append('photo', file)

                fetch('http://192.168.100.124:4000/upload_funny', {
                  method: 'POST',
                  body: formData
                })
                  .then(res => res.text())
                  .then(data => console.log("Odpověď serveru:", data))
                  .catch(err => console.error("Chyba při odesílání", err))
              })
            }}
            style={{ display: 'none' }}
          />
        </label>


        
    </div>
  )
}

export default HomePage