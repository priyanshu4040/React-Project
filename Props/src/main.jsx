import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Catalog from './componets/catalog.jsx'
import NewCatalog from './componets/NewCatalog.jsx'
import img1 from '../src/Assets/n1.png'
import img2 from '../src/Assets/mummy_portrait.jpg'
import img3 from './Assets/anime6.jpg'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Catalog name="Priyanshu Chakole" role="Software Engineer" image={img1} />
    <Catalog name="Alka Chakole" role="Master Chef" image={img2} />
    <br />
    <h1 className='text-5xl mb-10 mt-20'>Passing Arguments in components without using props</h1>
    <NewCatalog name="Prakash Chakole" role="Business" image={img3} />
  </StrictMode>,
)
