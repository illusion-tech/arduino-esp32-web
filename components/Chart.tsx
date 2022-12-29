export default function Chart(props: { url: string }) {
  if (!props.url) return (<></>);

  return (
    <img
      src={props.url}
      class="mx-auto my-4 h-96"
      alt="an example chart provided as an image"
    />
  );
}
