import logisticsLogo from '/images/icons8-service-100.png';
import passwordLogo from '/images/icons8-password-100.png';
import truckLogo from '/images/icons8-truck-100.png';
import customerLogo from '/images/icons8-call-100.png';
import shoppingLogo from '/images/icons8-buying-100.png';
import payLogo from '/images/icons8-online-payment-100.png';


export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Con BuyBox, simplificamos este proceso, brindando claridad y facilidad a tu experiencia de compras transfronterizas.</h2>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <img className="w-16 h-16 mb-4" src={logisticsLogo.src} alt="Logo de la empresa" />
              <h4 className="h4 mb-2">Amplia Red Logística</h4>
              <p className="text-lg text-gray-400 text-center">Cuenta con una amplia red logística que abarca múltiples ubicaciones internacionales, garantizando la entrega rápida y confiable de tus paquetes desde cualquier parte del mundo.</p>
            </div>


            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
            <img className="w-16 h-16 mb-4" src={passwordLogo.src} alt="Logo de la empresa" />
              <h4 className="h4 mb-2">Seguridad Avanzada</h4>
              <p className="text-lg text-gray-400 text-center">Nuestros casilleros están equipados con tecnología de seguridad avanzada, incluyendo sistemas de vigilancia y control de acceso, para proteger tus compras y garantizar su integridad hasta que las recibas.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <img className="w-16 h-16 mb-4" src={truckLogo.src} alt="Logo de la empresa" />
              <h4 className="h4 mb-2">Gestión de Envíos Eficiente</h4>
              <p className="text-lg text-gray-400 text-center">La gestión de tus envíos se vuelve más eficiente que nunca. Te proporcionamos herramientas intuitivas y opciones flexibles para que puedas gestionar tus paquetes de manera conveniente y sin complicaciones.</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-blocks]">
              <img className="w-16 h-16 mb-4" src={customerLogo.src} alt="Logo de la empresa" />
              <h4 className="h4 mb-2">Atención al Cliente</h4>
              <p className="text-lg text-gray-400 text-center">Nos comprometemos a brindarte una atención al cliente excepcional. Nuestro equipo está siempre disponible para responder tus preguntas, resolver tus inquietudes y garantizar una experiencia de usuario satisfactoria en todo momento.</p>
            </div>  

            {/* 5th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-blocks]">
              <img className="w-16 h-16 mb-4" src={shoppingLogo.src} alt="Logo de la empresa" />
  
              <h4 className="h4 mb-2"> Integración con Plataformas</h4>
              <p className="text-lg text-gray-400 text-center"> Facilitamos tus compras en línea al integrarnos con las principales plataformas de comercio electrónico, permitiéndote realizar tus pedidos de manera directa y sencilla desde tus tiendas favoritas en todo el mundo.</p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-blocks]">
            <img className="w-16 h-16 mb-4" src={payLogo.src} alt="Logo de la empresa" />
              <h4 className="h4 mb-2 text-center">Tarifas Competitivas y Transparentes</h4>
              <p className="text-lg text-gray-400 text-center">Ofrecemos tarifas competitivas y transparentes para nuestros servicios.Sabrás exactamente cuánto pagarás por el almacenamiento y envío, sin costos ocultos</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
