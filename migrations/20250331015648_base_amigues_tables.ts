import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // Alterando a tabela 'users'
  await knex.schema.alterTable('users', (table) => {
    table.string('username', 30).unique();
    table.boolean('adults_only').defaultTo(false);
    table.smallint('status').defaultTo(0).notNullable();
  });

  // Criando a tabela 'user_followers'
  await knex.schema.createTable('user_followers', (table) => {
    table.integer('id').primary();
    table.integer('followed_user_id').references('users.id').notNullable();
    table.integer('follower_user_id').references('users.id').notNullable();
    table.timestamp('joined_at').defaultTo(knex.fn.now());
  });

  // Criando a tabela 'communities'
  await knex.schema.createTable('communities', (table) => {
    table.integer('id').primary();
    table.integer('creator_id').references('users.id').notNullable();
    table.string('name', 50).unique().notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('publicly_visible').defaultTo(true);
  });

  // Criando a tabela 'community_rulesets'
  await knex.schema.createTable('community_rulesets', (table) => {
    table.integer('id').primary();
    table.integer('community_id').references('communities.id').notNullable();
    table.integer('user_id').references('users.id');
    table.string('title', 50).notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // Criando a tabela 'community_moderations'
  await knex.schema.createTable('community_moderations', (table) => {
    table.integer('id').primary();
    table.integer('community_id').references('communities.id').nullable();
    table.integer('user_id').references('users.id').notNullable();
    table.string('roles', 50).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });

  // Criando a tabela 'community_followers'
  await knex.schema.createTable('community_followers', (table) => {
    table.integer('id').primary();
    table.integer('community_id').references('communities.id').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.timestamp('joined_at').defaultTo(knex.fn.now());
  });

  // Alterando a tabela 'posts'
  await knex.schema.table('posts', (table) => {
    table.integer('post_id').references('posts.id');
    table.integer('community_id').references('communities.id');
    table.boolean('comment').defaultTo(false);
    table.boolean('adults_only').defaultTo(false);
    table.smallint('status').defaultTo(0).notNullable();

  });

  // Criando a tabela 'post_engagements'
  await knex.schema.createTable('post_engagements', (table) => {
    table.integer('id').primary();
    table.integer('post_id').references('posts.id').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.boolean('liked');
    table.boolean('disliked');
    table.boolean('seen');
    table.boolean('commented');
  });



  // Criando a tabela 'post_comments' (comentado no código original)
  /*
  await knex.schema.createTable('post_comments', (table) => {
    table.integer('id').primary();
    table.integer('post_id').references('posts.id').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.integer('comment_id').references('post_comments.id');
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  });
  */
}

export async function down(knex: Knex): Promise<void> {
  // Revertendo as alterações feitas no banco de dados.
  await knex.schema.dropTableIfExists('post_comments');
  await knex.schema.dropTableIfExists('post_engagements');
  await knex.schema.table('posts', (table) => {
    table.dropColumn('post_id')
    table.dropColumn('community_id')
    table.dropColumn('comment')
    table.dropColumn('adults_only')
    table.dropColumn('status')
  });
  await knex.schema.dropTableIfExists('community_followers');
  await knex.schema.dropTableIfExists('community_moderations');
  await knex.schema.dropTableIfExists('community_rulesets');
  await knex.schema.dropTableIfExists('communities');
  await knex.schema.dropTableIfExists('user_followers');
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('username');
    table.dropColumn('adults_only');
    table.dropColumn('status');
  });
}



