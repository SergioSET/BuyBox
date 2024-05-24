
import Header from '../../componentes/header';
import Hero from '../../componentes/hero';
import HomepageFeatures from '../../componentes/homepageFeatures';
import Footer from '../../componentes/footer';

import '../../css/style.css';


export default function Homepage() {
    return (
        <div>
            <Header>
                <Hero />
                <HomepageFeatures />
                <Footer />
            </Header>
        </div>

    );
}
