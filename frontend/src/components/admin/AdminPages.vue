<template>
    <div class="admin-page">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" 
        sub="Cadastro & Cia"
        />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab v-if="user.admin" title="Usuário">
                        <UserAdmin />     
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PageTitle from '../template/PageTitle.vue'
import ArticleAdmin from './ArtlicleAdmin.vue'
import CategoryAdmin from './CategoryAdmin.vue'
import UserAdmin from './UserAdmin.vue'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
    computed: mapState(['user']),
}
</script>

<style>
    .text {
        text-align: center;
    }

</style>