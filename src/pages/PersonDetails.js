import { Container, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readOne } from '../store/action'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FcLeft } from 'react-icons/fc'

function PersonDetails(props) {
    props = useParams()
    const { key } = props
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readOne(key))
        /* console.log(state.people) */
    }, [key])

    return (

        <Container>

            <Card>
                <Card.Header >
                    <Link to="/">
                        <FcLeft size={30} style={{ color: "black" }} />
                    </Link>
                </Card.Header>
                <Card.Body>
                    <h3 className="text-center">{state.person.firstName} {state.person.lastName} Details</h3><br />
                    Key: {state.person.key}<br />
                    First Name: {state.person.firstName}<br />
                    Last Name: {state.person.lastName}<br />
                    Full Name: {state.person.firstName} {state.person.lastName}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PersonDetails;