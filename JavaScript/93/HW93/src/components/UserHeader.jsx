export default function UserHeader({ user }) {
    return (
        <div className="user-header">
            <h1>{user.name}</h1>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
        </div>
    );
}