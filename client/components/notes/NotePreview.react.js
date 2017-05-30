
import React from 'react';

class NotePreview extends React.Component {

  constructor(props) {
    super(props);

	}

  render() {
    return (
      <div className={`component-note-preview ${this.props.selected ? 'selected' : ''}`} onClick={() => this.props.onSelect(this.props.note)}>
        <div className="title">{this.getNoteTitle()}</div>
        <div className="body">{this.getNoteBody()}</div>
      </div>
    );
	}

  getNoteTitle() {
    var content = this.props.note.content || '';
    return content.indexOf('\n') > -1 ? content.split('\n')[0] : content;
  }

  getNoteBody() {
    var content = this.props.note.content || '';
    return content.indexOf('\n') > -1 ? content.split('\n').slice(1) : '';
  }

}

export default NotePreview;
