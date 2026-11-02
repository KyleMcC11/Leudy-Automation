import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Testimonials from './components/Testimonials.jsx'
import About from './components/About.jsx'
import Roi from './components/Roi.jsx'
import Book from './components/Book.jsx'
import Contact from './components/Contact.jsx'
import Resources from './components/Resources.jsx'
import Privacy from './components/Privacy.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Roi />
        <Services />
        <Work />
        <Testimonials />
        <About />
        <Book />
        <Contact />
        <Resources />
        <Privacy />
      </main>
      <Footer />
      <div className="mobile-book-bar">
        <a className="btn btn-book" href="#book">
          Book a free process audit
        </a>
      </div>
    </>
  )
}

export default App
