import "../styles/Stats.css";
const Stats = () => {
  return (
    <div className="container flex flex-col mx-auto">
      <div className="w-full draggable">
        <div className="container flex flex-col items-center gap-16 mx-auto my-10">
          <div className="grid w-full grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-8">
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-accent-content">
                <span>2</span>+
              </h3>
              <p className="stat">
                Años en el mercado
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-accent-content">
                $<span>1</span>m
              </h3>
              <p className="stat">
                Crecimiento anual de ingresos
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-accent-content">
                <span id="countto3" data-decimal="1">50</span>k+
              </h3>
              <p className="stat">
                Socios alrededor del mundo
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-accent-content">
                <span id="countto4">10</span>+
              </h3>
              <p className="stat">
                Visitas diarias
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
