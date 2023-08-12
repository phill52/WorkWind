import CheckUser from "../components/CheckUser";

export default function Homepage(): JSX.Element {
    return (
        <div className="flex flex-col justify-center align-center">
            <div>
                <h1 className="text-red-900">Homepage</h1>
                <p>test hellooo</p>
                <CheckUser />
            </div>
        </div>
    );
}
