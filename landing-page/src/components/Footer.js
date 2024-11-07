import './Footer.css';

import twitterImage from '../images/twitter.png';
import instagramImage from '../images/instagram.png';
import facebookImage from '../images/facebook.png';

const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="social-links">
                <input type="image" alt="twitter" className="social-image" src={twitterImage} />
                <input type="image" alt="instagram" className="social-image" src={instagramImage}/>
                <input type="image" alt="facebook" className="social-image" src={facebookImage}/>
            </div>
            <div className="copyright">
            BUG NETWORK ©
            </div>
        </div>
    </footer>
);

export default Footer;