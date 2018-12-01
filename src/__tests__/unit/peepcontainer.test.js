import React from 'react';
import { shallow } from 'enzyme';
import PeepContainer from '../../peepcontainer';
import Peep from '../../peep'
import {mockPeeps} from '../../mocks/mockObjects';

describe('PeepContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PeepContainer peeps={mockPeeps}/>);
  });

  it('renders a Peep comp for each element in peep prop', () => {
    expect(wrapper.find(Peep).length).toEqual(1);
  });
});
