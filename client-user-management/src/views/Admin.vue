<template>
  <div class="container">
    <div class="user-container">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col col-xs-6">
              <h3 class="panel-title">All Users</h3>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in userList" v-bind:key="item.id">
                <th scope="row">{{ index }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.role }}</td>
                <td>
                  <button class="btn btn-info" @click="detail(item)">
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminService from "../services/admin.service";
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "admin",
  setup() {
    const router = useRouter();
    const data = reactive({
      userList: []
    });

    function detail(item) {
      localStorage.setItem("detailUser", JSON.stringify(item));
      router.push({ name: "detail", params: { id: item.id } });
    }

    onBeforeMount(() => {
      AdminService.findAllUsers().then(users => {
        data.userList = users.data;
      });
    });

    return {
      ...toRefs(data),
      detail
    };
  }
};
</script>
