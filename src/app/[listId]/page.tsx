export default function ListView({ params }: { params: { listId: string } }) {
  return <div>My Post: {params.listId}</div>;
}
