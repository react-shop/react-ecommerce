import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new EnzymeAdapter() });