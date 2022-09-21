import ApiClient from "@api/client"
import { Layout } from "@components/layout/Layout"

export default function UserPage({ user }) {
    return <Layout>
        <p>{user.username}</p>
        <p>{user.name}</p>
        <p>{user.surname}</p>
    </Layout>
}

export const getStaticProps = async ({ params }) => {

    try {
        const username = params?.username?.toString() || ''

        const apiClient = new ApiClient()
        const { data: user } = await apiClient.users.read(username)

        return {
            props: {
                user,
            },
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }

}


export const getStaticPaths = async () => {

    return {
        paths: [],
        fallback: 'blocking',
    }
}