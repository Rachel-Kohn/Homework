export default function Weather({ weather }) {
    if (!weather) return <p>Loading weather...</p>;

    const { name } = weather;
    const { temp } = weather.main;
    const { description, icon } = weather.weather[0];

    return (
        <div className="weather-card">
            <div>The weather in {name}</div>
            <img src={`https://openweathermap.org/img/w/${icon}.png`} alt={description} />
            <div>{temp} °F and {description}</div>
        </div>
    );
}