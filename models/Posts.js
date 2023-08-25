module.exports = (sequelize, DataTypes) => {
    
    const Posts = sequelize.define('Posts', {
        buyerAccount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buyerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeOfCompliantSend: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        compliantNature: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recieveCompliantDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endCompliantDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        justifiedComplaint: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        compliantEnd: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Posts.hasMany(models.Likes, {
            onDelete: 'cascade',
        })
    };

    
    return Posts;
}

