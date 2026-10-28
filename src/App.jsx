import GlobalStyle from "./components/GlobalStyle";
import { CustomCursor } from "./components/UI";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <CustomCursor />
            <Sidebar />

            <div id="Home">       <Hero />       </div>
            <div id="About">      <About />      </div>
            <div id="Skills">     <Skills />     </div>
            {/*<div id="Experience"> <Experience /> </div>*/}
            <div id="Projects">   <Projects />   </div>
            <div id="Achievements"><Achievements /></div>
            <div id="Contact">    <Contact />    </div>
            <Footer />
        </>
    );
}