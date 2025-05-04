import Swal from 'sweetalert2';

export const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showCloseButton: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
});