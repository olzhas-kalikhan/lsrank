import Lists from "~/components/lists";
import NewListForm from "~/components/new-list-form";

const Form = () => {
  return (
    <div className="p-4">
      <NewListForm />
      <Lists />
    </div>
  );
};
export default Form;
