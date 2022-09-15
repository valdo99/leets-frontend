import ApiClient from "@api/client"

export default function UserPage({ user }) {
    return <>
        <p>{user.username}</p>
        <p>{user.name}</p>
        <p>{user.surname}</p>
    </>
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