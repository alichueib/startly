function TeamManagement({
  members,
  editable = false,
  onAddMember,
  onRemoveMember,
  onChangeMember,
  error,
  title = 'Team',
  description,
}) {
  return (
    <div className="team-management">
      <div className="team-builder__header">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {editable ? (
          <button className="button-secondary" type="button" onClick={onAddMember}>
            Add Member
          </button>
        ) : null}
      </div>

      <div className="team-grid team-grid--management">
        {members.map((member, index) =>
          editable ? (
            <div key={`${member.name}-${index}`} className="team-editor">
              <div className="form-row">
                <label className="form-field">
                  <span>Name</span>
                  <input
                    className="form-control"
                    type="text"
                    value={member.name}
                    onChange={(event) =>
                      onChangeMember(index, 'name', event.target.value)
                    }
                  />
                </label>

                <label className="form-field">
                  <span>Role</span>
                  <input
                    className="form-control"
                    type="text"
                    value={member.role}
                    onChange={(event) =>
                      onChangeMember(index, 'role', event.target.value)
                    }
                  />
                </label>
              </div>

              <label className="form-field">
                <span>Short Bio</span>
                <textarea
                  className="form-control form-control--textarea form-control--compact"
                  value={member.bio}
                  onChange={(event) =>
                    onChangeMember(index, 'bio', event.target.value)
                  }
                  rows="3"
                />
              </label>

              {members.length > 1 ? (
                <button
                  className="team-editor__remove"
                  type="button"
                  onClick={() => onRemoveMember(index)}
                >
                  Remove member
                </button>
              ) : null}
            </div>
          ) : (
            <article key={`${member.name}-${index}`} className="subpanel team-card">
              <h3>{member.name}</h3>
              <p className="team-member__role">{member.role}</p>
              <p>{member.bio}</p>
            </article>
          ),
        )}
      </div>

      {error ? <small className="form-error">{error}</small> : null}
    </div>
  )
}

export default TeamManagement
