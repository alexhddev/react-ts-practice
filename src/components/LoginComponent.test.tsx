import LoginComponent from "./LoginComponent";
import {render, screen} from '@testing-library/react';

describe('LoginComponent test suite', ()=>{
    const loginServiceMock = {
        login: jest.fn()
    }

    const setTokenMock = jest.fn();

    const setup = ()=>{
        render(<LoginComponent loginService={loginServiceMock} setToken={setTokenMock}/>)
    }
    beforeEach(() => {
        setup();
        jest.clearAllMocks();
    })

    it('Renders LoginComponent', ()=>{
        const element = screen.getByRole('main');
        expect(element).toBeInTheDocument();
    })

})