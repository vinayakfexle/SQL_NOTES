module.exports = (sequelize, DataTypes) => {
    const MeetingAttendee = sequelize.define('MeetingAttendee', {
        meetingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        tableName: 'meetingattendees',
        timestamps: false
    });

    return MeetingAttendee;
};
