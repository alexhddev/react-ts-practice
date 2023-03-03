/* eslint-disable testing-library/no-node-access */
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

    it('Renders LoginComponent with document query', ()=>{
        const element = screen.getByRole('main');
        expect(element).toBeInTheDocument();
        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');
    })

    it('Renders LoginComponent with data-test query', ()=>{
        const inputs = screen.getAllByTestId('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].getAttribute('value')).toBe('')
        expect(inputs[1].getAttribute('value')).toBe('')
        expect(inputs[2].getAttribute('value')).toBe('Login')
    })

})