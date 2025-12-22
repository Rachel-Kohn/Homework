import './ListComponent.css';

export default function ListComponent({ name, items }) {
    return (
        <div>
            <h5>{name}</h5>
            <ul className="list">
                {items.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
        </div>
    );
}