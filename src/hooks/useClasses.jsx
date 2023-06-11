import { useQuery } from "@tanstack/react-query";


const useClasses = () => {

    

    const {data: classes = [], isLoading: loading} = useQuery({
        queryKey: ['classes'],
        queryFn: async() => {
            const res = await fetch('https://language-express-server.vercel.app/classes');
            return res.json();
        }
    })
    
    return [classes, loading]
}


export default useClasses;