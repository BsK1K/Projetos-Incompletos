import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Interests from './components/Interests'
import Skills    from './components/Skills'
import Portfolio from './components/Portfolio'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

export default function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Interests />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
