
exports.up = function (knex, promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deleteAt')
    })
};
