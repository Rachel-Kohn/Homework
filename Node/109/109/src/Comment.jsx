export default function Comment({ comment }) {
    return (
        <div className='comment'>
            <strong>{comment.author}</strong>: {comment.body}
        </div>
    );
}