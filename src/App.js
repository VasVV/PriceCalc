import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { faFacebookF, faVk, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [mins, setMins] = useState(0);
  const [sms, setSms] = useState(0);
  const [gb, setGb] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const [additionalServices, setAdditionalServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState({
    facebook: false,
    twitter: false,
    vk: false,
    instagram: false,
  });

  const handleSelect = (id) => {
      if ( additionalServices.includes(id) ) {
        setAdditionalServices(additionalServices.filter(e => e !== id));
        setSelectedServices(prevState => ({
          ...prevState,
          [id]: false
      }));
      } else {
        setAdditionalServices([...additionalServices, id]);
        setSelectedServices(prevState => ({
          ...prevState,
          [id]: true
      }));
      }
  }

  const sendData = async() => {
    const data = {mins, sms, gb, additionalServices};
    try {
      const response = await axios.post('http://localhost:3001/recievedata', data);
      setFinalPrice(response.data);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    sendData();
  }, [selectedServices, mins, sms, gb]);



  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
              <div className="price-calc">
                <h3>Калькулятор стоимости</h3>
                

                <div className="form-group">
                  <label htmlFor="mins" className="form-label">Минуты</label>
                  <input type="range" className="form-range" id="mins" min="0" max="3" step="1" onChange={(e) => setMins(e.target.value)} value={mins}/>
                  <div className="range-values">
                    <span className="range-values-item">100</span>
                    <span className="range-values-item">200</span>
                    <span className="range-values-item">300</span>
                    <span className="range-values-item">600</span>
                  </div>
                  
                </div>

                <div className="form-group">
                  <label htmlFor="sms" className="form-label">СМС</label>
                  <input type="range" className="form-range" id="sms" min="0" max="3" step="1" onChange={(e) => setSms(e.target.value)} value={sms}/>
                  <div className="range-values">
                    <span className="range-values-item">0</span>
                    <span className="range-values-item">50</span>
                    <span className="range-values-item">100</span>
                    <span className="range-values-item">150</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="gb" className="form-label">Гигабайты</label>
                  <input type="range" className="form-range" id="gb" min="0" max="3" step="1" onChange={(e) => setGb(e.target.value)} value={gb}/>
                  <div className="range-values">
                    <span className="range-values-item">5</span>
                    <span className="range-values-item">10</span>
                    <span className="range-values-item">15</span>
                    <span className="range-values-item">25</span>
                  </div>
                </div>

                <div className="form-group">
                    <label>Дополнительные услуги</label>
                    <div className="button-block">

                      <div className="button-group">
                        <button className={selectedServices['facebook'] ? "btn btn-success btn-circle btn-sm" : "btn btn-light btn-circle btn-sm"} id="facebook" onClick={(e) => handleSelect(e.target.id)}>
                          <FontAwesomeIcon icon={faFacebookF} className='svg-button' />
                        </button>
                        <p className="btn-price">10 p</p>
                      </div>

                      <div className="button-group">
                        <button className={selectedServices['twitter'] ? "btn btn-success btn-circle btn-sm" : "btn btn-light btn-circle btn-sm"} id="twitter" onClick={(e) => handleSelect(e.target.id)}>
                          <FontAwesomeIcon icon={faTwitter}  className='svg-button' />
                        </button>
                        <p className="btn-price">15 p</p>
                      </div>

                      <div className="button-group">
                        <button className={selectedServices['vk'] ? "btn btn-success btn-circle btn-sm" : "btn btn-light btn-circle btn-sm"} id="vk" onClick={(e) => handleSelect(e.target.id)}>
                          <FontAwesomeIcon icon={faVk}  className='svg-button'/>
                        </button>
                        <p className="btn-price">20 p</p>
                      </div>

                      <div className="button-group">
                        <button className={selectedServices['instagram'] ? "btn btn-success btn-circle btn-sm" : "btn btn-light btn-circle btn-sm"} id="instagram" onClick={(e) => handleSelect(e.target.id)}>
                          <FontAwesomeIcon icon={faInstagram}  className='svg-button' />
                        </button>
                        <p className="btn-price">25 p</p>
                      </div>
                    </div>
          
                </div>

                <div className="form-group sum">
                  <label htmlFor="gb" className="form-label">Итоговая стоимость</label>
                  <p className="form-sum">{finalPrice} рублей</p>
                </div>
                
           </div>
           </div>
          </div>
    </div>
  );
}

export default App;
