
import React from 'react';
import ReactDOM from 'react-dom';
import Model from 'mutable-model';
import api from 'api';

import Login from 'helpers/Login';
import Nav from 'helpers/Nav';

import NotePreview from 'notes/NotePreview';
import NoteFull from 'notes/NoteFull';

class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      loginOpen: false,
      searchString: '',
      listOpen: false,
      selectedNoteIndex: 0,
      notes: [ ],
    });
	}

  componentDidMount() {
    this.setState({ model: this.model })
    this.refreshNotes();
  }

  render() {
    return (
      <div className={`component-notes ${this.model.listOpen ? 'list-open' : ''}`}>
        <Login
          open={this.model.loginOpen}
          onLoginSuccessful={(token) => {
            window.localStorage.setItem('jwt_token', token);
            this.model.loginOpen = false;
            this.refreshNotes();
          }} />

        <Nav
          title="Notes"
          onMenuButtonClick={() => {
            this.model.listOpen = !this.model.listOpen;
            if(this.model.listOpen) {
              this.refreshNotes();
            }
          }}
          searchValue={this.model.searchString}
          onSearchChange={(val) => {
            this.model.searchString = val;
            this.model.listOpen = true;
          }} />

        <div className="main-container">
          <div className="notes-list">
            <div className="new-note" onClick={this.handleCreateNoteButtonClick.bind(this)}>
              <i className="material-icons">add_circle_outline</i>
              New note
            </div>
            {this.model.notes
              .map((note, index) =>
                note.content.toLowerCase().includes(this.model.searchString.toLowerCase()) ?
                  <NotePreview note={note} key={note._id} selected={this.model.selectedNoteIndex === index} onSelect={(note) => {
                      this.model.selectedNoteIndex = index;
                      window.location.hash = `#${note._id}`;
                      this.model.listOpen = false;
                      this.model.searchString = '';
                      this.clearEmptyNotes();
                    }} />
                : null
              )}
          </div>
          <div className="current-note" onClick={() => this.model.listOpen = false}>
            {this.model.notes[this.model.selectedNoteIndex] ?
              <NoteFull note={this.model.notes[this.model.selectedNoteIndex]} />
            : null }
          </div>
        </div>
      </div>
    );
	}

  handleCreateNoteButtonClick() {
    api.note.createNote({
        content: '',
        date: new Date().valueOf(),
      })
      .then(() => {
        this.refreshNotes()
          .then(() => {
            this.model.listOpen = false;
            this.model.selectedNoteIndex = 0;
          });
      });
  }

  refreshNotes() {
    return api.note.getAllNotes()
      .then((response) => {
        if(response.status === 401) {
          this.model.loginOpen = true;
          return [];
        } else {
          return response.json();
        }
      })
      .then((notes) => {
        this.model.notes = notes;
        if(window.location.hash) {
          this.model.selectedNoteIndex = this.model.notes.findIndex((note) => note._id === window.location.hash.substr(1));
        }
      })
  }

  clearEmptyNotes() {
    //TODO: delet empty notes
  }

}

ReactDOM.render(<Notes />, document.getElementById('root'));

export default Notes;
