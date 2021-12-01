import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { FcViewDetails } from "react-icons/fc";
import Swal from 'sweetalert2';
import { readAll, post, deleted, put, readOne } from '../store/action'

function Home() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [first_Name, setfirstName] = useState("")
    const [last_Name, setlastName] = useState("")
    const [key, setKey] = useState("")
    const [flag, setFlag] = useState(false) // true tombol submit hide, false tombol update dan cancel hide


    useEffect(() => {
        dispatch(readAll())
        /* console.log(state.people) */
    }, [])

    /* useEffect(() => {
      dispatch(readOne(id))
    }, [id]) */

    function onFormSubmit(e) {
        e.preventDefault()
        const serverport = {
            key: key,
            firstName: first_Name,
            lastName: last_Name,
        }
        /* console.log(serverport) */
        dispatch(post(serverport))
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Data tersimpan',
            showConfirmButton: false,
            timer: 1500
        })
        setKey('')
        setfirstName('')
        setlastName('')
    }

    function getDelete(id) {
        /* console.log(id) */
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data yang hilang tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleted(id));
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success');
            }
        });
        //dispatch(deleted(id))
    }

    function selectPerson(id) {
        dispatch(readOne(id))
        setfirstName(state.people[id].firstName)
        setlastName(state.people[id].lastName)
        setKey(state.people[id].key)
        //console.log(state.people[id])
        /* console.log(state.people[id].firstName)
        console.log(state.people[id].lastName)
        console.log(id) */
    }

    function editData(e) {
        e.preventDefault()
        const serverport = {
            key: key,
            firstName: first_Name,
            lastName: last_Name,
        }
        if (key === '' || first_Name.length === '' || last_Name.length === '') {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Data tidak boleh kosong!',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else if (key.length < 1 || first_Name.length < 3 || last_Name.length < 3) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Data error',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
            dispatch(put(key, serverport))
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Data tersimpan',
                showConfirmButton: false,
                timer: 1500
            })
            setKey('')
            setfirstName('')
            setlastName('')
        }
    }

    function changeFlag() {
        setFlag(!flag)
        setKey('')
        setfirstName('')
        setlastName('')
    }



    return (
        <Container>
            <Nav className="navbar justify-content-center" style={{ backgroundColor: "lightblue", marginBottom: "30px" }}>
                <h3>Home</h3>
            </Nav>
            <Row>
                <Col>
                    <Form onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Key</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter key"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                required
                                minLength="1"
                                maxLength="5"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            <Form.Text className="text-muted">
                                Enter key.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                value={first_Name}
                                onChange={(e) => setfirstName(e.target.value)}
                                required
                                minLength="3"
                                maxLength="50"
                                onKeyPress={(event) => {
                                    if (!/[A-z]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            <Form.Text className="text-muted">
                                Enter First Name.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                value={last_Name}
                                onChange={(e) => setlastName(e.target.value)}
                                required
                                minLength="3"
                                maxLength="50"
                                onKeyPress={(event) => {
                                    if (!/[A-z]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            <Form.Text className="text-muted">
                                Enter Last Name.
                            </Form.Text>
                        </Form.Group>
                        <Button hidden={flag} variant="primary" type="submit">
                            Submit
                        </Button>

                        <Button variant="success" hidden={!flag} onClick={editData} style={{ marginRight: "20px" }}>Update</Button>
                        <Button variant="warning" hidden={!flag} onClick={changeFlag}>Cancel</Button>

                    </Form>
                </Col>
                <Col>
                    <Table striped bordered hover responsive="sm">
                        {/* {arr} */}
                        {/* {JSON.stringify(state.people)} */}
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>key</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(state.people).map((arr, index) => (
                                    <tr key={index}>
                                        <td>{/* state.people[arr].key */ index + 1}</td>
                                        <td>{state.people[arr].key}</td>
                                        <td>{state.people[arr].firstName}</td>
                                        <td>{state.people[arr].lastName}</td>
                                        <td width={200}>
                                            <Link to={`/PersonDetails/${state.people[arr].key}`}><FcViewDetails style={{ marginRight: "20px" }} size={40} /></Link>
                                            <FaEdit type={Button} size={40} style={{ marginRight: "20px", cursor: "pointer" }} onClick={() => { selectPerson(state.people[arr].key); setFlag(true); }} />
                                            <FaTrashAlt size={40} style={{ cursor: "pointer" }} onClick={() => getDelete(state.people[arr].key)} />
                                            {/* <Button onClick={() => getDelete(state.people[arr].key)}>Delete</Button> */}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
export default Home;