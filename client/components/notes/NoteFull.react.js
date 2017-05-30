
import React from 'react';
import marked from 'marked';
import Model from 'mutable-model';
import api from 'api';
import { debounce } from 'utilities';

class NoteFull extends React.Component {

  constructor(props) {
    super(props);

    var _saveNote = () => {
      api.note.updateNote(Object.assign(this.props.note, {
          content: this.model.noteContent,
          date: new Date().valueOf(),
        }));
    }
    this.saveNote = debounce(_saveNote, 500);

    this.model = new Model(this, {});
	}

  componentWillMount() {
    if(this.props.note) {
      this.model.noteContent = this.props.note.content;
    }
  }

  componentDidUpdate(prevProps) {
    if(!!prevProps.note !== !!this.props.note || prevProps.note._id !== this.props.note._id) {
      this.model.noteContent = this.props.note.content;
    }
  }

  render() {
    return (
      <div className={`component-note-full`}>
        <textarea
          className="content"
          ref={(el) => {
            if(el) {
              el.style.height = `calc(2 * ${el.scrollHeight}px - 1em)`;
            }
          }}
          value={this.model.noteContent}
          onChange={(e) => {
            this.model.noteContent = e.target.value;
            this.saveNote();
          }}></textarea>
      </div>
    );
	}

}
export default NoteFull;
