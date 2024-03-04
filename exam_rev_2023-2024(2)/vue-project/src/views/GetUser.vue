





<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        return {
            userData: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
})

var myHeaders = new Headers();
myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI4YTk5ZWI5Mzk2NWZkMmFjMmFjYzgiLCJuYW1lIjoiRGF2aWQiLCJlbWFpbCI6ImRhdmlkQGNhbXB1cy5ldWcuZXMiLCJpc0FkbWluIjoiMSIsImlhdCI6MTcwNjg1ODcwMSwiZXhwIjoxNzA2ODYyMzAxfQ.W_mT_KwUQzSg1I_rXDSAEiac3HSxE9F3xrv0TdFdRZw");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/api/users/65bb7deb2dbae0a56244df35", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
</script>
