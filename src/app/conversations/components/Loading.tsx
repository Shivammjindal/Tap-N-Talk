import { HashLoader } from "react-spinners"

export const LoadingComponent = () => {

    return (
        <>
            <div className="fixed flex justify-center items-center z-50 text-lg bg-white">
                <HashLoader color="#268cd0"/>
            </div>
        </>
    )
}