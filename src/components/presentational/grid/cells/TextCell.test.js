import React from 'react';
import renderer from 'react-test-renderer';
import TextCell from './TextCell';

describe('TextCell', () => {
  it('should render text normally', () => {
    const tree = renderer.create(<TextCell>text</TextCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render numbers normally', () => {
    const tree = renderer.create(<TextCell>{2.4}</TextCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should represent objects without errors', () => {
    const tree = renderer.create(<TextCell>{{ text: 'text' }}</TextCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should represent lists without errors', () => {
    const tree = renderer.create(<TextCell>{[1, 'text', {}]}</TextCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should throw errors when children is null', () => {
    const tree = renderer.create(<TextCell>{null}</TextCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
